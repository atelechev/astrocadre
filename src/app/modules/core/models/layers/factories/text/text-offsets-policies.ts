import { CenteredText } from 'src/app/modules/core/models/layers/factories/text/centered-text';
import { CloseRightText } from 'src/app/modules/core/models/layers/factories/text/close-right-text';
import { TextOffsetPolicy } from 'src/app/modules/core/models/layers/factories/text/text-offset-policy';
import { TopRightText } from 'src/app/modules/core/models/layers/factories/text/top-right-text';

/**
 * Provides access to existing TextOffsetPolicies.
 */
export class TextOffsetPolicies {

  public static readonly CENTERED: TextOffsetPolicy = new CenteredText();

  public static readonly TOP_RIGHT: TextOffsetPolicy = new TopRightText();

  public static readonly CLOSE_RIGHT: TextOffsetPolicy = new CloseRightText();

}

