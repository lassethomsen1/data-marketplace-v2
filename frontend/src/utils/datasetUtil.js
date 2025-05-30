export function formatDataset(dataset) {
  dataset.createdAt = new Date(dataset.createdAt).toLocaleDateString();
  dataset.updatedAt = new Date(dataset.updatedAt).toLocaleDateString();

  if (dataset.filesize > 100_000) {
    dataset.filesize = (dataset.filesize / 1000).toFixed() + ' MB'; // Convert to MB
  } else {
    dataset.filesize = (dataset.filesize / 1024).toFixed() + ' KB'; // Convert to KB
  }

  dataset.price = '$' + dataset.price / 100; // Format price

  return dataset;
}
