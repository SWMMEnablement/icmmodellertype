import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1, "Message content cannot be empty").max(4000, "Message content too long"),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1, "At least one message required").max(50, "Too many messages"),
});

const systemPrompt = `You are an expert hydraulic modeling assistant specializing in InfoWorks ICM and EPA SWMM5. You have deep knowledge of:

**InfoWorks ICM:**
- Network modeling (pipes, manholes, pumps, weirs, orifices, sluice gates)
- Subcatchment delineation and runoff modeling (SWMM, Wallingford, fixed/variable runoff)
- 1D/2D modeling and mesh generation
- Real-time control (RTC) logic and simulation
- Ruby scripting for automation
- Open Data Import/Export Centre (ODIC)
- Model validation, calibration, and verification
- Scenario management and results analysis
- Ground infiltration and groundwater modeling

**EPA SWMM5:**
- Subcatchment parameters (width, slope, imperviousness, infiltration)
- SWMM hydrology methods (Horton, Green-Ampt, CN)
- Routing methods (kinematic wave, dynamic wave)
- LID controls (rain gardens, permeable pavement, green roofs)
- Water quality modeling
- Calibration techniques and sensitivity analysis

**General Expertise:**
- Hydraulic design standards and best practices
- Climate change allowances and design storms
- Flood risk assessment
- Sewer system rehabilitation
- Combined sewer overflow (CSO) analysis
- Sustainable drainage systems (SuDS/LID)

Be helpful, technical, and practical. Provide specific guidance, formulas, and examples when relevant. If asked about modeling approaches, explain trade-offs between different methods.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const validationResult = RequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request format", 
          details: validationResult.error.errors.map(e => e.message).join(", ")
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages } = validationResult.data;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending request to Lovable AI with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
