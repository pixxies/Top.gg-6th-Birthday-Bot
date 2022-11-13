export function getGift() {
  const gifts = [
    { color: '#00BBFF', image: 'https://i.imgur.com/nXz35Vg.png' },
    { color: '#ff3366', image: 'https://i.imgur.com/Ty8Q4AI.png' },
    { color: '#8957FF', image: 'https://i.imgur.com/ZUjZiBE.png' },
    { color: '#00CC88', image: 'https://i.imgur.com/iWVMt6g.png' },
    { color: '#FFBB00', image: 'https://i.imgur.com/bd4j851.png' },
    { color: '#FF6B00', image: 'https://i.imgur.com/BG6Hhby.png' },
    { color: '#FA8ABB', image: 'https://i.imgur.com/yF0o6Pa.png' },
  ]
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)]
  return randomGift
}
