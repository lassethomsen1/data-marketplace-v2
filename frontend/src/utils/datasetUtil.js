export function formatDataset(dataset) {
  dataset.createdAt = new Date(dataset.createdAt).toLocaleDateString();
  dataset.updatedAt = new Date(dataset.updatedAt).toLocaleDateString();

  if (dataset.filesize > 1024 * 1024) {
    dataset.filesize = (dataset.filesize / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    dataset.filesize = (dataset.filesize / 1024).toFixed(2) + ' KB';
  }

  dataset.price = '$' + dataset.price / 100; // price is stored in cents

  dataset.author = dataset.seller.name; // assuming seller is the author for now

  return dataset;
}
