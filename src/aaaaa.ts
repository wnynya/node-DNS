import dns from 'dns/promises';

async function a(domain: string, timeout: number = 2000, server?: string) {
  let result = {
    error: undefined,
    type: 'dns/a',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    if (domain.toLowerCase() == 'localhost') {
      result.records = ['127.0.0.1'];
      resolve(result);
    } else {
      dns.setServers(server ? [server] : ['1.1.1.1', '8.8.8.8', '8.8.4.4']);
      dns
        .resolve4(domain)
        .then((records) => {
          clearTimeout(to);
          result.records = records;
          resolve(result);
        })
        .catch((error) => {
          if (error.code != 'ENODATA') {
            result.error = error.code;
          }
          resolve(result);
        });
    }
  });
}

async function aaaa(domain, timeout = 2000, server?) {
  let result = {
    error: undefined,
    type: 'dns/aaaa',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    if (domain.toLowerCase() == 'localhost') {
      resolve(result);
    } else {
      dns.setServers(server ? [server] : ['1.1.1.1', '8.8.8.8', '8.8.4.4']);
      dns
        .resolve6(domain)
        .then((records) => {
          clearTimeout(to);
          result.records = records;
          resolve(result);
        })
        .catch((error) => {
          if (error.code != 'ENODATA') {
            result.error = error.code;
          }
          resolve(result);
        });
    }
  });
}

async function aaaaa(domain, server) {
  let result = {
    error: undefined,
    type: 'dns/aaaaa',
    domain: domain,
    records: [],
  };
  const ipv4: any = await a(domain, 2000, server);
  const ipv6: any = await aaaa(domain, 2000, server);
  if (ipv4.error || ipv6.error) {
    result.error = ipv4.error || ipv6.error;
    return result;
  }
  result.records = ipv4.records.concat(ipv6.records);
  return result;
}

async function ip(host, server) {
  if (
    !/((?:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))|(?:([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(?=\s|$))/.test(
      host
    )
  ) {
    const res = await aaaaa(host, server);
    if (res.records.length <= 0) {
      return null;
    } else {
      return res.records[0];
    }
  } else {
    return host;
  }
}

async function ips(host, server) {
  if (
    !/((?:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))|(?:([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(?=\s|$))/.test(
      host
    )
  ) {
    const res = await aaaaa(host, server);
    if (res.records.length <= 0) {
      return null;
    } else {
      return res.records;
    }
  } else {
    return [host];
  }
}

export { a, aaaa, aaaaa, ip, ips };
