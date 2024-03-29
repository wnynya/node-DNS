import dns from 'dns/promises';

async function soa(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/SOA',
    domain: domain,
    records: {},
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveSoa(domain)
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
  });
}

async function cname(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/CNAME',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveCname(domain)
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
  });
}

async function mx(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/MX',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveMx(domain)
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
  });
}

async function txt(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/TXT',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveTxt(domain)
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
  });
}

async function srv(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/SRV',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveSrv(domain)
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
  });
}

async function ns(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/NS',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveNs(domain)
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
  });
}

async function caa(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/CAA',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveCaa(domain)
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
  });
}

async function ptr(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/PTR',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolvePtr(domain)
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
  });
}

async function naptr(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/NAPTR',
    domain: domain,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .resolveNaptr(domain)
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
  });
}

async function reverse(ip, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/REVERSE',
    ip: ip,
    records: [],
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .reverse(ip)
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
  });
}

async function lookup(domain, timeout = 2000) {
  let result = {
    error: undefined,
    type: 'DNS/LOOKUP',
    domain: domain,
    records: {},
  };
  return new Promise((resolve, reject) => {
    let to = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout);
    dns
      .lookup(domain)
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
  });
}

export { soa, cname, mx, txt, srv, ns, caa, ptr, naptr, reverse, lookup };
