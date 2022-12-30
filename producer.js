import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['infinite-muskrat-11810-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'aW5maW5pdGUtbXVza3JhdC0xMTgxMCROxZxK-AVrB8kYukDmsHcoaGslsFeu6bk',
      password: '',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova Solicitação de amizade!!!',
          category: 'social',
          recipientId: randomUUID()
        })
      }
    ]
  });

  await producer.disconnect();
}

bootstrap();
