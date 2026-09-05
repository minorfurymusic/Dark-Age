import {IOath} from './IOath';
import {OathName, ALL_OATHS} from '../../common/oaths/OathName';
import {createOathByName} from './AllOaths';

interface OathManifest {
  oathNames: Array<OathName>;
  factory: (name: OathName) => IOath;
}

export namespace OathManifests {
  export const manifests: Array<OathManifest> = [
    {
      oathNames: ALL_OATHS,
      factory: (name: OathName) => {
        const oath = createOathByName(name);
        if (!oath) {
          throw new Error(`Unknown oath: ${name}`);
        }
        return oath;
      },
    },
  ];

  export function createOath(name: OathName): IOath | undefined {
    for (const manifest of manifests) {
      if (manifest.oathNames.includes(name)) {
        return manifest.factory(name);
      }
    }
    return undefined;
  }
}
