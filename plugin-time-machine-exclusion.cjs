const Attribute = 'com.apple.metadata:com_apple_backup_excludeItem'

module.exports = {
  name: 'plugin-time-machine-exclusion',
  factory: (require) => ({
    hooks: {
      async afterAllInstalled(project, _options) {
        const { join } = require('path')
        const { execFile } = require('child_process')
        const { platform } = require('os')

        const linker = project.configuration.get('nodeLinker')
        const enabled = platform() === 'darwin' && (linker === 'node-modules' || linker === 'pnpm')

        if (enabled) {
          const dir = join(project.cwd, 'node_modules')

          await new Promise((resolve) => execFile('xattr', ['-w', Attribute, '1', dir], () => resolve()))
        }
      },
    },
  }),
}
