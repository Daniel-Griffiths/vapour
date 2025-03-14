<div align="center">
    <img width="100" src="/public/icon.png" alt="Logo"/>
</div>
<div align="center">
    An alternative open source Steam client built with React and Electron.
</div>

## Usage

In order to use Vapour you are required to add a Steam ID and Steam API key in the settings page.
The easiest way to find your Steam ID is via a site like https://steamidfinder.com/.
You can get a Steam API key by visiting the following link http://steamcommunity.com/dev/apikey.

<p align="center"><img src="/public/screenshot.png"/></p>

## Getting Started

To run the project locally run the following command:

```bash
yarn dev
```

And to create a release build run the following command:

```bash
# Windows
yarn build:windows

# Mac
yarn build:mac

# Linux
yarn build:linux
```

## For linux flatpak

Unfortunately electron-builder does not yet competently build flatpaks, and the older approach using electron-packager and electron-installer-flatpak can't handle native modules. A work-around is to use electron-builder for the packaging step and electron-installer-flatpak for the actual flatpak creation.

First you need to run `yarn install -g @malept/electron-installer-flatpak` (this can't be added as dev-dependency since it is not cross-platform and yarn doesn't allow optional dev-dependencies).

Then

```bash
yarn run build:dist
yarn run build:linuxdir
yarn run build:flatpak
```

In order for this to work you must have already installed flatpak-builder using your favorite package manager (e.g. sudo pamac install flatpak-builder) and run:

```
flatpak install flathub org.freedesktop.Platform//19.08;
flatpak install org.freedesktop.Sdk//19.08;
flatpak install org.electronjs.Electron2.BaseApp/x86_64/stable
```

## Running Github Actions Locally

Install [act](https://github.com/nektos/act) and run the following command

```bash
act -P macos-latest=node:20 --reuse --container-architecture linux/amd64
```
