const repository = "https://github.com/2214331539/Yita";
const version = "0.9.0-preview.3";
const release = `${repository}/releases/tag/v${version}`;

export const product = {
  repository,
  version,
  release,
  issues: `${repository}/issues`,
  discussions: `${repository}/issues/new/choose`,
  contribute: `${repository}#贡献`,
  guide: `${repository}/tree/v${version}/docs`,
  windowsGuide: `${repository}/blob/v${version}/docs/WINDOWS_PREVIEW_TESTING.md`,
  macGuide: `${repository}/blob/v${version}/docs/MAC_PREVIEW_TESTING.md`,
  downloads: {
    windows: `${repository}/releases/download/v${version}/Yita-Setup.exe`,
    mac: `${repository}/releases/download/v${version}/Yita.dmg`,
  },
};
