import JSZip from 'jszip';
import apiClient from '../api/apiClient';
import { os } from 'platform';
import { saveAs } from 'file-saver';
import { IPackage } from '../hooks/packages';

const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const makeDownloadApiCall = async (
  packageIds: string[],
  isPublic = true,
  cb?: () => void
) => {
  const url = isPublic ? '/downloads/public' : '/downloads';
  try {
    await apiClient.post(url, {
      packageIds,
    });
    if (cb) cb();
  } catch (error) {
    console.log(error);
  }
};

export default async function generateZip(
  packages: IPackage[],
  filename = 'public',
  isPublic = true,
  cb?: () => void
) {
  if (packages.length === 0) return alert('Please provide packages');

  const zip = new JSZip();
  const folder = zip.folder('downloads');
  const isWin32 = os?.architecture === 32;

  const newPackages = packages.map(p => ({
    id: p._id,
    url: isWin32 ? p.win32url : p.win64url,
  }));

  newPackages.forEach(p => {
    const blobPromise = fetch(`${downloadUrl}/${p.url}`).then(function (
      response
    ) {
      if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response.blob());
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    });
    const name = p.url.substring(p.url.lastIndexOf('/')); // important
    folder?.file(name, blobPromise);
  });

  zip
    .generateAsync({ type: 'blob' })
    .then(blob => {
      saveAs(blob, filename);
      makeDownloadApiCall(
        newPackages.map(p => p.id),
        isPublic,
        cb
      );
    })
    .catch(e => console.log(e));
}
