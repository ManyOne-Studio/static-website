export const data = {
  title: "Creating an underwater world",
  date: "2026-05-07",
  slug: "creating_an_underwater_world",
  tags: ["Tech Art", "Underwater", "Caustics", "Fog"],
  desc: "Towards the Glow is set entirely underwater, so some work needs to be done to tailor the rendering to the aesthetic. How do games simulate underwater effects ?",
  sections: [
    {
      title: "FOG",
      content: "One of the basic effects that helps create underwater visuals is fog. Underwater, we generally can't see as far as out of water, and the distance that we can see depends on water contents, light sources etc. The first solution is basic Unity fog, that blends the screen color with a fog color proportionally to the distance. This works fine. This is what basic Unity fog looks like :",
      images: ["/img/basicFog.png"]
    },
    {
      title: "Volumetrics",
      content: "In our case, we'd like the water to display light rays (also called caustics), which add to the immersion. To do so, we whipped up a simple volumetric fog shader. In general volumetric fog is fog that is calculated on different points for one pixel. This means that we can achieve much more complex visual effects using this technique. Basically, for each pixel, we march along a ray and check different lighting values, and add the result to a value that will represent the pixel's fog value. Here's an example of what this looks like :",
      images: ["/img/volume_water.gif"]
    }
  ]
};