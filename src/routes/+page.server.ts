import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
    return { config: locals.config };
}