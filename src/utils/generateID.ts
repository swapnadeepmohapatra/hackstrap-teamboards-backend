import Snowflake from "nodejs-snowflake";

const generator = new Snowflake({ machineID: 0, returnNumber: true });

export default function () {
  return generator.getUniqueID() as bigint;
}
