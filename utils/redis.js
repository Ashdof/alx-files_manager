import redis from 'redis';
import { promisify } from 'util';

// Redis Client service class
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsnyc = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected: ${error.message}`);
    });

    this.client.on('connect', () => {
    //   console.log('Redis client connected successfully.');
    });
  }

  /**
   * Checks if the connection to redis is successful
   * @return {boolean} true if connection is successful or false if not
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * gets value corresponding to key in redis
   * @key {string} key to search for in redis
   * @return {string}  value of key
   */
  async get(key) {
    const value = await this.getAsnyc(key);

    return value;
  }

  /**
   * Creates a new key in redis with a specific TTL
   * @key {string} key to be saved in redis
   * @value {string} value to be asigned to key
   * @duration {number} TTL of key
   * @return {undefined}  No return value
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Deletes key in redis service
   * @key {string} key to be deleted
   * @return {undefined}  No return value
   */
  async del(key) {
    this.client.del(key);
  }
}

// Create new class object
const redisClient = new RedisClient();

export default redisClient;
