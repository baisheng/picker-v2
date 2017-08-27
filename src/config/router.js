module.exports = [
  [/\/api\/request_code/, 'api/public', 'rest'],
  [/\/api\/verify_code/, 'api/public', 'rest'],
  [/\/api\/signin/, 'api/signin', 'rest'],
  [/\/api\/org\/(?:\/(\d+))?/, 'api/org?id=:1', 'rest'],
  [/\/api\/orgs(?:\/(\w+))?/, 'api/orgs', 'rest'],
  [/\/api\/orgs\/subdomain_validation\/(?:\/(\w+))?/, 'api/orgs', 'rest'],
  // ['/api/orgs/subdomain_validation/:subdomain', 'api/orgs:1/', 'get'],
  [/\/api\/posts(?:\/(\d+))?/, 'api/posts?id=:1', 'rest'],
  [/\/api\/users(?:\/(\d+))?/, 'api/users?id=:1', 'rest'],
  [/\/api\/options(?:\/(\w+))?/, 'api/options?key=:1', 'rest']
];
