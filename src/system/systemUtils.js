let deviceIsTablet = false;

export const isTablet = () => deviceIsTablet;

export const setDeviceIsTablet = (isTablet) => {
  deviceIsTablet = isTablet;
}