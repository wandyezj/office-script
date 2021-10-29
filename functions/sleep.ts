function sleep(seconds: number) {

  const millisecondDelay = seconds * 1000
  const start = Date.now()
  let now = Date.now();

  while((now - start) < millisecondDelay) {
    now = Date.now();
    // busy wait
    for (let i = 0; i < 1000; i++){}
  }

}
