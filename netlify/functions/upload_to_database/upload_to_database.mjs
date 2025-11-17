import { neon } from "@neondatabase/serverless";

// Netlify function that inserts posted JSON into a Neon/Postgres DB
export async function handler(request, context) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { name, imagead, constants, graph, integrals, regression, sigma, turing, color, videoad } = JSON.parse(request.body || '{}');

    const sql_bool = (bool) => bool ? 'TRUE' : 'FALSE';

    // Parameterized insert using tagged template to avoid injection issues
    const result = await sql`
      INSERT INTO bisnis_data (name, imagegood, constants, graphing, integrals, regression, sigma, turing, color, videoad)
      VALUES (
        ${name},
        ${sql_bool(imagead)},
        ${sql_bool(constants)},
        ${sql_bool(graph)},
        ${sql_bool(integrals)},
        ${sql_bool(regression)},
        ${sql_bool(sigma)},
        ${sql_bool(turing)},
        ${color},
        ${sql_bool(videoad)}
      );
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    };
  }
}
