import type { Bear } from "$lib/types/Bear";
import { PUBLIC_API_BASE_URL } from "$env/static/public"

export const queryBears = async (): Promise<Bear[] | null> => {
  let response;
  try {
    response = await fetch(`${PUBLIC_API_BASE_URL}/bears`);
  } 
  catch (error) {
    console.error("Error fetching bears: ", error);
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const bears = await response.json();

  console.log("Bears: ", bears);

  return bears;
};