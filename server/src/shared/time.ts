export function getNextThreeHours() {
  const currentTime = new Date();
  const nextThreeHours = new Date(currentTime.getTime() + 3 * 60 * 60 * 1000); 
  return nextThreeHours;
}


