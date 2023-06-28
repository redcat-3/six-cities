import { Expose } from 'class-transformer';

export default class UploadAvatarRdo {
  @Expose()
  public filePath!: string;
}
