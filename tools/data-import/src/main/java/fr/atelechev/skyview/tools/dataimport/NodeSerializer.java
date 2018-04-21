package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class NodeSerializer extends StdSerializer<Node> {

  private static final double DISTANCE = 2d;

  public NodeSerializer() {
    super(Node.class);
  }

  @Override
  public void serialize(Node node, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    jsonGenerator.writeArray(new double[] { node.getRa(), node.getDec() }, 0, 2);
  }

  /*
  Formulae taken from:
  https://math.stackexchange.com/questions/15323/how-do-i-calculate-the-cartesian-coordinates-of-stars?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

      A = (RA_hours * 15) + (RA_minutes * 0.25) + (RA_seconds * 0.004166)
      B = ( ABS(Dec_degrees) + (Dec_minutes / 60) + (Dec_seconds / 3600)) * SIGN(Dec_Degrees)
      C = distance in light years or parsecs

      Cartesian:
      X = (C * cos(B)) * cos(A)
      Y = (C * cos(B)) * sin(A)
      Z = C * sin(B)
   */
  private double[] toCartesianCoords(double ra, double decl) {
    final double raRad = Math.toRadians(raToAngle(ra));
    final double declRad = Math.toRadians(decl);
    final double x = DISTANCE * Math.cos(declRad) * Math.cos(raRad);
    final double y = DISTANCE * Math.cos(declRad) * Math.sin(raRad);
    final double z = DISTANCE * Math.sin(declRad);
    final int nbDecimals = 3;
    return new double[] { round(x, nbDecimals), round(y, nbDecimals), round(z, nbDecimals) };
  }

  private static double raToAngle(double ra) {
    final double multiplied = ra * 15d;
    return multiplied > 180d ? multiplied - 360d : multiplied;
  }

  private static double round(double value, int decimals) {
    final int tmpMultiplier = (int) Math.pow(10, decimals);
    final int leftShifted = (int) Math.round(value * tmpMultiplier);
    return leftShifted / (double) tmpMultiplier;
  }

}
