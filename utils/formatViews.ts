export function formatViews (viewCount: string | number): string {
  const views = typeof viewCount === "string" ? parseInt(viewCount) : viewCount; 
  if (views < 1000){
    return `${views} views`;
  }

  if(views < 1_000_000){
    const thousands = (views/1000).toFixed(1);
    return `${thousands.replace(".0", "")}K views`;
  }

  if(views < 1_000_000_000){
    const millions = (views/1_000_000).toFixed(1);
    return `${millions.replace('.0', '')}M views`
  }

  const billions = (views/1_000_000_000).toFixed(1);
  return `${billions.replace(".0", "")}B views`
}
