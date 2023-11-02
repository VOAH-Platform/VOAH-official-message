import { Download, File, Image } from 'lucide-react';

import { FileBox, FileContents, FileHeaderText, FileText } from './style';

export function FileContent({
  isPicture,
  canDownload,
  type,
  capacity,
  name,
}: {
  isPicture: boolean;
  canDownload: boolean;
  type: string;
  capacity: string;
  name: string;
  [key: string]: unknown;
}) {
  return (
    <FileBox>
      {isPicture ? (
        // <FilePicture />
        <Image size={25} />
      ) : (
        <File size={25} />
      )}
      <FileContents>
        <FileHeaderText>
          {type} | {capacity}
        </FileHeaderText>
        <FileText>
          {name.length <= 10 ? name : name.substring(0, 9) + '...'}
        </FileText>
      </FileContents>
      {canDownload ? <Download /> : <></>}
    </FileBox>
  );
}
