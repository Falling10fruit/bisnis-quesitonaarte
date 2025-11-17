import { neon } from "@neondatabase/serverless";

// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default (request, context) => {
  try {
    const sql = neon();
    const { name, imagead, constants, graph, integrals, regression, sigma, turing, color, videoad} = JSON.parse(request.body);

    const sql_bool = (bool) => bool ? 'TRUE' : 'FALSE';

    const result = sql`
      INSERT INTO Bisnis_data
        VALUES
        (
          '${name}',
          ${sql_bool(imagead)},
          ${sql_bool(constants)},
          ${sql_bool(graph)},
          ${sql_bool(integrals)},
          ${sql_bool(regression)},
          ${sql_bool(sigma)},
          ${sql_bool(turing)},
          '${color}',
          ${sql_bool(videoad)}
        );
    `;

    return new Response("I THINK IT WORKED");
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}
