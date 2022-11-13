export function progressBar(percent: number) {
  const lft_off = '<:progbarleftoff:1036260618732318730>'
  const mid_off = '<:progbarlmidoff:1036260621676707871>'
  const rig_off = '<:progbarrightoff:1036260625338343535>'
  const lft_on = '<:progbarlefton:1036260619877371924>'
  const mid_on = '<:progbarlmidon:1036260623249588324>'
  const lft_full = '<:progbarleftfull:1036260617515962459>'
  const mid_full = '<:progbarlmidfull:1036260620884004905>'
  const rig_full = '<:progbarrightfull:1036260624482709564>'
  if (percent >= 100) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      rig_full
    )
  }
  if (percent > 90) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_on +
      rig_off
    )
  }
  if (90 >= percent && percent > 80) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_on +
      mid_off +
      rig_off
    )
  }
  if (80 >= percent && percent > 70) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_on +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (70 >= percent && percent > 60) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_on +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (60 >= percent && percent > 50) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_full +
      mid_full +
      mid_on +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (50 >= percent && percent > 40) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_full +
      mid_on +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (40 >= percent && percent > 30) {
    return (
      lft_full +
      mid_full +
      mid_full +
      mid_on +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (30 >= percent && percent > 20) {
    return (
      lft_full +
      mid_full +
      mid_on +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (20 >= percent && percent > 10) {
    return (
      lft_full +
      mid_on +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (10 >= percent && percent > 0) {
    return (
      lft_on +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  if (percent === 0) {
    return (
      lft_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      mid_off +
      rig_off
    )
  }
  return
}
