// ... (previous imports remain same)
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // ... (previous code)
  if (context) {
    await page.render({ 
      canvasContext: context, 
      viewport: viewport,
      canvas: canvas
    }).promise;
    imageUrls.push(canvas.toDataURL('image/png'));
  }
  // ... (rest of code)
}