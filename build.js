import { execSync } from 'child_process';

const hasCloudCreds = Boolean(
  (process.env.PUBLIC_TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID) &&
  process.env.TINA_TOKEN
);

// Používáme --skip-cloud-checks, aby zpoždění indexace na Tina Cloud serverech
// nikdy nezablokovalo build na Vercelu.
const command = hasCloudCreds
  ? 'npx tinacms build --content=local --skip-cloud-checks -c "astro build"'
  : 'npx tinacms build --local --skip-cloud-checks -c "astro build"';

console.log(`[build] Tina Cloud credentials ${hasCloudCreds ? 'found' : 'not configured (using safe fallback)'}.`);
console.log(`[build] Executing: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  process.exit(error.status || 1);
}
