import Snowflake from 'nodejs-snowflake';

const generator = new Snowflake({ machineID: 0, returnNumber: true });

/**
 * Adds two numbers together.
 * @return {bigint}— the unique id
 */
export default function (): bigint {
  return generator.getUniqueID() as bigint;
}
