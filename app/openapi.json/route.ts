import { services, siteConfig } from "@/lib/constants";
import { absoluteUrl } from "@/lib/routes";

export const dynamic = "force-static";

/**
 * Machine-readable contract for the one action an agent can take here:
 * submitting a project enquiry. Generated from site data so the `service`
 * enum cannot drift from what is actually offered.
 *
 * Deliberately documents only POST /api/contact. The honeypot field is
 * described as a spam trap so a well-behaved agent leaves it empty rather
 * than filling it in and getting silently dropped.
 */
function buildSchema() {
  const serviceNames = services.map((service) => service.title);

  return {
    openapi: "3.1.0",
    info: {
      title: `${siteConfig.name} Contact API`,
      description:
        `Submit a project enquiry to ${siteConfig.name} without a browser. ` +
        "Enquiries are answered by a human, normally within one business day.",
      version: "1.0.0",
      contact: { email: siteConfig.email, url: absoluteUrl("/contact") },
    },
    servers: [{ url: siteConfig.url }],
    paths: {
      "/api/contact": {
        post: {
          operationId: "submitEnquiry",
          summary: "Submit a project enquiry",
          description:
            "Sends an enquiry to the team and a confirmation email to the address supplied. " +
            "No authentication required. Please submit only genuine enquiries on behalf of a " +
            "real person or organisation, with their knowledge.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "service", "message"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Full name of the person enquiring.",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      description:
                        "Reply address. The confirmation email is sent here, so it must be real.",
                    },
                    service: {
                      type: "string",
                      description: "Which service the enquiry is about.",
                      examples: serviceNames,
                    },
                    message: {
                      type: "string",
                      description: "What the enquirer wants to build or solve.",
                    },
                    phone: {
                      type: "string",
                      description: "Optional contact number, including country code.",
                    },
                    companySize: {
                      type: "string",
                      description: "Optional headcount band, e.g. '11-50'.",
                    },
                    challenge: {
                      type: "string",
                      description: "Optional description of the current bottleneck.",
                    },
                    website: {
                      type: "string",
                      description:
                        "Spam honeypot. Leave absent or empty. A non-empty value causes the " +
                        "submission to be silently discarded while still returning success.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Enquiry accepted.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { success: { type: "boolean", const: true } },
                  },
                },
              },
            },
            400: {
              description: "A required field is missing.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { error: { type: "string" } },
                  },
                },
              },
            },
            500: {
              description: "Email delivery or configuration failure.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { error: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}

export function GET() {
  return Response.json(buildSchema(), {
    headers: { "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
