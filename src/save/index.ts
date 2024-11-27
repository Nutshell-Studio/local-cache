import * as core from '@actions/core'
import {exec} from '../utils/cache'

async function run(): Promise<void> {
  try {
    const key = core.getState('key')

    const cachePath = core.getState('cache-path')
    const path = core.getState('path')

    await exec(`mkdir -p ${cachePath}`)
    const mv = await exec(`mv ./${path} ${cachePath}`)

    core.debug(mv.stdout)
    if (mv.stderr) core.error(mv.stderr)
    if (!mv.stderr) core.info(`Cache saved with key ${key}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
