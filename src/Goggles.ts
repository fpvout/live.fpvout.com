const ENDPOINT_OUT = 3;
const ENDPOINT_IN = 4;
const BUFFER_LENGTH = 200000;
export const VID = 0x2ca3;
export const PID = 0x001f;

interface DataCallback {
  (data: DataView): void;
}

export default class Goggles {
  private device: USBDevice;
  private onDataCallback: DataCallback | null = null;
  private pollData: boolean = false;

  constructor(device: USBDevice) {
    this.device = device;
  }

  get serialNumber() {
    return this.device.serialNumber;
  }

  set onData(callback:DataCallback) {
    this.onDataCallback = callback;
  }

  async connect() {
    if (!this.device.opened) {
      await this.device.open();
    }
    await this.device.claimInterface(3);
  }

  async close() {
    this.device.close();
  }

  async requestVideo() {
    this.sendRawData(new Uint8Array([0x52, 0x4d, 0x56, 0x54]));
  }

  async startPolling() {
    this.pollData = true;
    while (this.pollData) {
      if (this.device.opened) {
        const result = await this.device.transferIn(ENDPOINT_IN, BUFFER_LENGTH);
        if (this.onDataCallback !== null && result.data) {
          this.onDataCallback(result.data);
        }
      }
    }
  }

  async stopPolling() {
    this.pollData = false;
  }

  async sendRawData(buffer: Uint8Array): Promise<USBOutTransferResult> {
    return this.device.transferOut(ENDPOINT_OUT, buffer);
  }
}