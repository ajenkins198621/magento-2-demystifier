function getFileInformation(path: any, magentoFileMap: any) {
  // Split the path into individual steps
  const pathSteps = path.split('/');

  // Initialize a variable to store the current directory
  let currentDirectory = magentoFileMap;

  // Initialize an array to store the path information
  const pathInfo = [];

  // Iterate through the path steps
  for (let i = 0; i < pathSteps.length; i++) {

    const step = pathSteps[i];
    const isBeforeFile = i === pathSteps.length - 2;
    const isFile = step.includes(".");

    if (!isFile) {
      if (typeof currentDirectory[step] !== "undefined") {
        // If the step is a directory, add its information to the pathInfo array
        pathInfo.push({
          step,
          title: currentDirectory[step].title,
          description: currentDirectory[step].description,
        });

        // Update the current directory to the next level
				const keyToLookIntoNext = isBeforeFile ? 'files' : 'subDirectories';
        currentDirectory = currentDirectory[step][keyToLookIntoNext];
      } else if (typeof currentDirectory['*'] !== "undefined") {

        const titleToUse = currentDirectory['*'].title.replace("*", step);
        const descriptionToUse = currentDirectory['*'].description.replace("*", step);
        pathInfo.push({
          step,
          title: titleToUse,
          description: descriptionToUse,
        });

				const keyToLookIntoNext = isBeforeFile ? 'files' : 'subDirectories';
        currentDirectory = currentDirectory['*'][keyToLookIntoNext];

      } else {
        pathInfo.push({
          step,
          title: `${step} directory not found!`,
          description: '',
        });
      }
    } else {

      // currentDirectory.file doesn't exist

      // Handle Files
      if (typeof currentDirectory[step] !== "undefined") {
        pathInfo.push({
          step,
          title: currentDirectory[step].title,
          description: currentDirectory[step].description,
        });
      } else {
        const fileParts = step.split('.');
        if (fileParts.length > 0) {
          const wildcard = `*.${fileParts[fileParts.length - 1]}`;
          if (typeof currentDirectory[wildcard] !== "undefined") {
            pathInfo.push({
              step,
              title: currentDirectory[wildcard].title.replace("*", step),
              description: currentDirectory[wildcard].description.replace("*", step),
            });
          }
        }
      }
    }
  }


  // Return the file information and path steps
  return {
    fileInfo: currentDirectory,
    pathSteps: pathInfo,
  };
}

// Example usage:
// const filePath = 'app/code/Wheelpros/CheckoutExtended/Controller/Cart/Index.php';
// const result = getFileInformation(filePath);

export default getFileInformation;