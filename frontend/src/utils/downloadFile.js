import { axiosService } from './axios';

const downloadFile = async (url, file) => {
  try {
    const response = await axiosService.get(`${url}${url.endsWith('/') || file.startsWith('/') ? '' : '/'}${file}`, {
      responseType: 'blob'
    });

    if (response.status === 200) {
      // Create a temporary download link element
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.download = file;

      // Trigger the download by programmatically clicking the link
      document.body.appendChild(downloadLink);
      downloadLink.click();
      // Clean up: Revoke the object URL and remove the temporary link element
      window.URL.revokeObjectURL(downloadLink.href);
      document.body.removeChild(downloadLink);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default downloadFile;
