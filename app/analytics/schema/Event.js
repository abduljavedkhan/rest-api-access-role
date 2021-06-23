cube(`Events`, {
    sql: `SELECT * FROM stats.events`,
  
    refreshKey: {
      sql: `SELECT UNIX_TIMESTAMP()`
    },
  
    measures: {
      count: {
        type: `count`
      },
  
      online: {
        type: `countDistinct`,
        sql : `${anonymousId}`,
        filters: [
          { sql: `${timestamp} > date_sub(now(), interval 3 minute)` }
        ]
      },
  
      pageView: {
        type: `count`,
        filters: [
          { sql: `${eventType} = 'pageView'` }
        ]
      },
  
      buttonClick: {
        type: `count`,
        filters: [
          { sql: `${eventType} = 'buttonCLicked'` }
        ]
      }
    },
  
    dimensions: {
      secondsAgo: {
        sql: `TIMESTAMPDIFF(SECOND, timestamp, NOW())`,
        type: `number`
      },
  
      anonymousId: {
        sql: `anonymousId`,
        type: `string`
      },
  
      eventType: {
        sql: `eventType`,
        type: `string`
      },
  
      timestamp: {
        sql: `timestamp`,
        type: `time`
      }
    }
  });
  