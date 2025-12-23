import type {Bear} from "$lib/types/Bear";
import {API_V1} from "$lib/constants/api";

export const queryBears = async (): Promise<Bear[] | null> => {
  let response;
  try {
    response = await fetch(API_V1.bears);
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