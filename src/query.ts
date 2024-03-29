import { a, aaaa, aaaaa, ip, ips } from './aaaaa.js';
import {
  soa,
  cname,
  mx,
  txt,
  srv,
  ns,
  caa,
  ptr,
  naptr,
  reverse,
  lookup,
} from './others.js';

async function query(domain) {
  let result = {
    error: undefined,
    type: 'DNS',
    domain: domain,
    records: {},
  };
  var tasks = [];
  tasks.push(soa(domain));
  tasks.push(a(domain));
  tasks.push(aaaa(domain));
  tasks.push(cname(domain));
  tasks.push(mx(domain));
  tasks.push(txt(domain));
  tasks.push(srv(domain));
  tasks.push(ns(domain));
  tasks.push(caa(domain));
  tasks.push(ptr(domain));
  tasks.push(naptr(domain));
  tasks.push(reverse(domain));
  tasks.push(lookup(domain));

  const records = await Promise.all(tasks);
  for (const record of records) {
    const key = record.type.substring(4).toLowerCase();
    delete record.domain;
    delete record.type;
    result.records[key] = record;
  }
  return result;
}

query.a = a;
query.aaaa = aaaa;
query.aaaaa = aaaaa;
query.ip = ip;
query.ips = ips;
query.soa = soa;
query.cname = cname;
query.mx = mx;
query.txt = txt;
query.srv = srv;
query.ns = ns;
query.caa = caa;
query.ptr = ptr;
query.naptr = naptr;
query.reverse = reverse;
query.lookup = lookup;

export default query;

export { query };
