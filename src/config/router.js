module.exports = [
  [/\/rest\/orgs\/(\d+)\/podcast(?:\/(\d+))?/, 'api/orgs/posts?orgId=:1&id=:2&type=podcast', 'rest'],
  [/\/rest\/orgs\/(\d+)\/(\w+)(?:\/(\d+))?/, 'api/orgs/:2/?orgId=:1&id=:3', 'rest'],

  // [/\/rest\/request_code/, 'api/public', 'rest'],
  // [/\/rest\/verify_code/, 'api/public', 'rest'],
  // [/\/rest\/signin/, 'api/signin', 'rest'],
  [/\/api\/org\/(\d+)?/, 'api/org', 'rest'],
  // [/\/rest\/orgs(?:\/(\w+))?/, 'api/orgs', 'rest'],
  // [/\/rest\/file(?:\/(\w+))?/, 'api/file', 'rest'],
  // [/\/rest\/orgs\/subdomain_validation\/(?:\/(\w+))?/, 'api/orgs', 'rest'],
  // ['/rest/orgs/subdomain_validation/:subdomain', 'api/orgs:1/', 'get'],
  // [/\/rest\/podcast(?:\/(\d+))?/, 'api/posts?id=:1&type=podcast', 'rest'],
  // [/\/rest\/posts(?:\/(\d+))?/, 'api/posts?id=:1', 'rest'],
  // [/\/rest\/users(?:\/(\d+))?/, 'api/users?id=:1', 'rest'],
  // [/\/rest\/options(?:\/(\w+))?/, 'api/options?key=:1', 'rest']
];
