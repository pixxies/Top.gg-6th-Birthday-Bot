export function getGift() {
  const gifts = [{ color: '#81C02F', image: 'https://i.imgur.com/ifveORz.png' }]
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)]
  return randomGift
}
