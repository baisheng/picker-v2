module.exports = [
  [/\/rest\/app\/(\d+)\/podcast(?:\/(\d+))?/, 'rest/app/posts?appId=:1&id=:2&type=podcast', 'rest'],
  [/\/rest\/app\/?(\d+)\/(\w+)(?:\/(\d+))?/, 'rest/app/:2/?appId=:1&id=:3', 'rest'],
  [/\/rest\/org\/?(\d+)\/apps(?:\/(\d+))?/, 'rest/org/apps/?orgId=:1&appId=:2', 'rest'],
  [/\/rest\/org\/(\d+)\/podcast(?:\/(\d+))?/, 'rest/org/posts?orgId=:1&id=:2&type=podcast', 'rest'],
  [/\/rest\/org\/(\d+)\/signin?/, 'rest/org/signin/?orgId=:1', 'rest'],
  [/\/rest\/org\/?(\d+)\/(\w+)(?:\/(\d+))?/, 'rest/org/:2/?orgId=:1&id=:3', 'rest'],
  // [/\/rest\/org(?:\/(\d+))?/, 'rest/org/?orgId=:1', 'rest'],
  // [/\/rest\/org\/(\d+)\/podcast(?:\/(\d+))?/, 'rest/orgs/posts?orgId=:1&id=:2&type=podcast', 'rest'],
  [/\/rest\/orgs\/(\d+)\/podcast(?:\/(\d+))?/, 'rest/orgs/posts?orgId=:1&id=:2&type=podcast', 'rest'],
  [/\/rest\/orgs\/(\d+)\/(\w+)(?:\/(\d+))?/, 'rest/orgs/:2/?orgId=:1&id=:3', 'rest'],

  // [/\/rest\/request_code/, 'rest/public', 'rest'],
  // [/\/rest\/verify_code/, 'rest/public', 'rest'],
  // [/\/rest\/signin/, 'rest/signin', 'rest'],
  // [/\/rest\/orgs(?:\/(\w+))?/, 'rest/orgs', 'rest'],
  [/\/rest\/file(?:\/(\w+))?/, 'rest/file', 'rest'],
  // [/\/rest\/orgs\/subdomain_validation\/(?:\/(\w+))?/, 'rest/orgs', 'rest'],
  // ['/rest/orgs/subdomain_validation/:subdomain', 'rest/orgs:1/', 'get'],
  // [/\/rest\/podcast(?:\/(\d+))?/, 'rest/posts?id=:1&type=podcast', 'rest'],
  // [/\/rest\/posts(?:\/(\d+))?/, 'rest/posts?id=:1', 'rest'],
  // [/\/rest\/users(?:\/(\d+))?/, 'rest/users?id=:1', 'rest'],
  // [/\/rest\/options(?:\/(\w+))?/, 'rest/options?key=:1', 'rest']
];
