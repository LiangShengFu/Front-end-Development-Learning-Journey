const x = 'async setup()：\n```\nasync setup() {\n  const data = await fetch("/api/data").then(r => r.json())\n  return { data }\n}\n```'
console.log(x)
