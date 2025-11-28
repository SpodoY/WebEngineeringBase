import type { PageLoad } from "./$types";
import { queryBears } from '$lib/utils/bears';

export const load: PageLoad = async () => {
  const bears = await queryBears();
  return { bears };
}