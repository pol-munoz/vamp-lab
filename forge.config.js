const { spawn } = require('child_process')
const fs = require('fs').promises
const path = require('path')


module.exports = {
  packagerConfig: {
    icon: 'resources/app/icon',
    extraResource: [
        'resources/osx/vamp.icns',
        'resources/windows/vamp.ico',
    ],
    extendInfo: 'resources/osx/Info.plist'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
      config: {
        format: 'ULFO'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: '/resources/icon.png'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/preload.js',
              },
            },
          ],
        },
      },
    },
  ],
  hooks: {
    packageAfterPrune: async (forgeConfig, buildPath) => {
      let packages = []

      await fs.rename(path.resolve(buildPath, 'package.json'), path.resolve(buildPath, 'tmp.json'))

      const webpackConfigJs = require('./webpack.main.config.js')
      Object.keys(webpackConfigJs.externals).forEach(pkg => {
        packages.push(pkg)
      })

      return new Promise((resolve, reject) => {
        const npmInstall = spawn('npm', ['i', '--legacy-peer-deps', ...packages], {
          cwd: buildPath,
          stdio: 'inherit',
        })

        npmInstall.on('close', async (code) => {
          if (code === 0) {
            await fs.rename(path.resolve(buildPath, 'tmp.json'), path.resolve(buildPath, 'package.json'))

            resolve()
          } else {
            reject(new Error('process finished with error code ' + code))
          }
        })

        npmInstall.on('error', (error) => {
          reject(error)
        })
      })
    }
  }
}
