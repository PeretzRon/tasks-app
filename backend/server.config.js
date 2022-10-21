process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

module.exports = {
  ELK_LOGGER_LOGSTASH_URL : 'https://localhost:9200',
  ELK_LOGGER_LOGSTASH_USERNAME: 'elastic',
  ELK_LOGGER_LOGSTASH_PASSWORD : 'IRaOpeIx*Cyy4A84LhJA',
  LOGGER_TYPES : ['elk', 'console'],
  SERVICE_NAME: 'todo-app',
}
