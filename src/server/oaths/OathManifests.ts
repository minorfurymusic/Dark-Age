import {IOath} from './IOath';
import {OathName} from '../../common/oaths/OathName';

interface OathManifest {
  oathNames: Array<OathName>;
  factory: (name: OathName) => IOath;
}

export namespace OathManifests {
  export const manifests: Array<OathManifest> = [
    // TODO: Add oath manifests from individual oath modules
    // Phase 3: Create individual oath cards (80 total)
    // For now, this is a placeholder structure ready for oath cards
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
