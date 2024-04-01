export const commonClusterNotificationProps = {
  className: 'cluster-notification',
  style: { background: 'white' },
  lowContrast: true
};

export const commonDownloadNotificationProps = {
  className: 'download-notification',
  lowContrast: true,
  hideCloseButton: true
};

/**
 * Utils function to generate random length of characters
 * @param {number} length length of characters
 * @returns {string} random characters
 */
export const genRandomChars = length => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Utils function to find duplicated hostnames in the cluster
 * @param {object[]} tableData an array containing configs of each node
 * @returns {string|null} When duplicated hostnames exist, it will return the first discoverd duplicated hostname. Otherwise, it will return `null`. nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
 */
export const findDuplicatedHostname = tableData => {
  let set = new Set();
  for (const config of tableData) {
    if (set.has(config.hostname)) return config.hostname;
    set.add(config.hostname);
  }
  return null;
};

/**
 * Utils function to find duplicated IP addresses of IFs in the cluster
 * @param {object[]} tableData an array containing configs of each node
 * @returns {{config1: {hostname: string, IFName: string}, config2: {hostname: string, IFName: string} IPAddr: string}|null}
 * It will return the first discovered duplicated IF pair `config1` and `config2`. `hostname` is the hostname of the node, `IFName` is the name of the IF.
 * `IPAddr` is the duplicated IP address. When there is no duplicated IP addresses, it will return `null`.
 */
export const findDuplicatedIF = tableData => {
  let IPDict = {};
  for (const config of tableData) {
    const IFs = [...config.initIFs, ...config.bondIFs, ...config.vlanIFs];
    for (const IF of IFs) {
      if (!IF.IPAddr) continue;
      if (IF.IPAddr in IPDict) {
        return {
          config1: {
            hostname: config.hostname,
            IFName: IF.name
          },
          config2: IPDict[IF.IPAddr],
          IPAddr: IF.IPAddr
        };
      }
      IPDict[IF.IPAddr] = {
        hostname: config.hostname,
        IFName: IF.name
      };
    }
  }
  return null;
};

/**
 * Utils function to find whether any hostname is identical to the virtual hostname
 * @param {object} clusterConfig config of the cluster
 * @param {object[]} tableData an array containing configs of each node
 * @returns {string|null} It will find a node with hostname identical to the virtual hostname and return the hostname.
 * When no such node exists, it will return `null`.
 */
export const findInvalidVirtualHostname = (clusterConfig, tableData) => {
  if (!clusterConfig?.HA) return null;
  for (const config of tableData) {
    if (config.hostname === clusterConfig.HASettings.virtualHostname)
      return config.hostname;
  }
  return null;
};

/**
 * Utils function to find whether any IP address of IF is identical to the virtual hostname
 * @param {object} clusterConfig config of the cluster
 * @param {object[]} tableData an array containing configs of each node
 * @returns {{hostname: string, IFName: string, IPAddr: string}|null} It will find an IF with IP address identical to the virtual hostname.
 * When no such IF exists, it will return `null`.
 */
export const findInvalidVirtualIP = (clusterConfig, tableData) => {
  if (!clusterConfig?.HA) return null;
  for (const config of tableData) {
    const IFs = [...config.initIFs, ...config.bondIFs, ...config.vlanIFs];
    for (const IF of IFs) {
      if (!IF.IPAddr) continue;
      if (IF.IPAddr === clusterConfig.HASettings.virtualIP) {
        return {
          hostname: config.hostname,
          IFName: IF.name,
          IPAddr: IF.IPAddr
        };
      }
    }
  }
  return null;
};

/**
 * Utils function to determine whether the role distribution is valid.
 *
 * standalone:
 * * There will be a unique control, control-converged, or edge-core.
 *
 * HA:
 * * The nodes must satisfy one of the following configurations:
 *   1. Normal configuration: There are 3 control and control-converged nodes without any edge-core or moderator nodes.
 *   2. Edge configuration: There are "3 edge-cores" or "2 edge-cores + 1 moderator" without any control or control-converged nodes.
 * @param {object} clusterConfig config of the cluster
 * @param {object[]} tableData an array containing configs of each node
 * @returns {bool} indicates whether the role distribution is valid
 *
 */
export const isRoleDistributionValid = (clusterConfig, tableData) => {
  const ctrlNum = tableData.filter(config =>
    ['control', 'control-converged'].includes(config.role)
  ).length;
  const edgeNum = tableData.filter(
    config => config.role === 'edge-core'
  ).length;
  const moderatorNum = tableData.filter(
    config => config.role === 'moderator'
  ).length;

  if (!clusterConfig.HA && ctrlNum + edgeNum === 1) return true;
  if (clusterConfig.HA) {
    if (ctrlNum === 3 && edgeNum + moderatorNum === 0) return true;
    if (ctrlNum === 0 && edgeNum + moderatorNum === 3 && moderatorNum <= 1)
      return true;
  }
  return false;
};

/**
 * Utils function that indicates whether `compute`, `control-converged`, `edge-core` exists in the cluster
 * @param {object[]} tableData an array containing configs of each node
 * @returns {bool}
 */
export const hasComputeRole = tableData => {
  return !!tableData.find(config =>
    ['compute', 'control-converged', 'edge-core'].includes(config.role)
  );
};

/**
 * Utils function that indicates whether `moderator` exists in the cluster
 * @param {object[]} tableData an array containing configs of each node
 * @returns {bool}
 */
export const hasModeratorRole = tableData => {
  return !!tableData.find(config => config.role === 'moderator');
};

/**
 * Utils function to get short cluster id from clusterInfo
 * @param {{id, name}} clusterInfo an object containing id and name
 * @returns {string}
 */
export const getClusterShortId = clusterInfo =>
  clusterInfo?.id?.slice(-12) || '0'.repeat(12);
