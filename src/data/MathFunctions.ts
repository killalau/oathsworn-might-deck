export function factorial(n: number) { 
  let ans = 1; 
  
  if(n === 0)
      return 1;
  for (let i = 2; i <= n; i++) 
      ans = ans * i; 
  return ans; 
}