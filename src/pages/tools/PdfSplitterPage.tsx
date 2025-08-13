// ... (previous imports remain same)
const handleSplit = async () => {
  // ... (previous code)
  await page.render({
    canvasContext: context,
    viewport,
    canvas: canvas
  }).promise;
  // ... (rest of code)
}