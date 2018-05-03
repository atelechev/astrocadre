
export class CameraAction {

  public static readonly SET = 'set';

  public static readonly ROTATE = 'rotate';

  public static readonly FIELD_OF_VIEW = 'field-of-view';

  public static readonly ALIGN_NS_AXIS = 'align-ns-axis';

  public static readonly VALUES = [ CameraAction.SET,
                                    CameraAction.ROTATE,
                                    CameraAction.FIELD_OF_VIEW,
                                    CameraAction.ALIGN_NS_AXIS ];

}
