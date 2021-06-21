import { LeafCommand, Option } from 'furious-commander'
import { pickStamp } from '../../service/stamp'
import { FeedCommand } from './feed-command'

export class Update extends FeedCommand implements LeafCommand {
  public readonly name = 'update'

  public readonly description = 'Update feed'

  @Option({ key: 'reference', alias: 'r', description: 'The new reference', required: true })
  public reference!: string

  public async run(): Promise<void> {
    super.init()

    if (!this.stamp) {
      this.stamp = await pickStamp(this.beeDebug, this.console)
    }

    await this.updateFeedAndPrint(this.reference)
    this.console.dim('Successfully updated feed.')
  }
}
